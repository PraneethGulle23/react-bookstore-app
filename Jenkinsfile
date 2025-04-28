pipeline {
    agent any
    environment {
        GIT_PATH = "C:\\Program Files\\Git\\bin\\git.exe"
        APP_VERSION = bat(
            script: """
            if exist "%GIT_PATH%" (
                "%GIT_PATH%" describe --tags --abbrev=0 2^>nul || echo latest
            ) else (
                echo latest
            )
            """, 
            returnStdout: true
        ).trim()

        PREVIOUS_VERSION = bat(
            script: '''
            if exist "%GIT_PATH%" (
                for /f "tokens=*" %%i in ('"%GIT_PATH%" tag --sort=-creatordate ^| findstr /r /v "^$" ^| more +1') do (
                    echo %%i
                    exit /b
                )
            ) else (
                echo latest
            )
            ''',
            returnStdout: true
        ).trim()
    }
    stages {
        stage('Setup') {
            steps {
                script {
                    def gitInstalled = fileExists(env.GIT_PATH)
                    echo "Git installed: ${gitInstalled}"
                    
                    if (!gitInstalled) {
                        bat """
                        if not exist src (
                            curl -L -o repo.zip https://github.com/PraneethGulle23/react-bookstore-app/archive/refs/heads/main.zip
                            tar -xf repo.zip
                            move react-bookstore-app-main\\* .
                            rmdir /s /q react-bookstore-app-main
                            del repo.zip
                        )
                        """
                    } else {
                        checkout scm
                    }
                }
            }
        }
        
        stage('Install & Build') {
            steps {
                bat """
                call npm install
                call npm run build
                """
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the application using Docker-based Ansible..."
                    bat """
                    docker run --rm -v ${pwd()}:/workspace librespace/ansible ansible-playbook -i /workspace/ansible/inventory /workspace/ansible/deploy.yml
                    """
                }
            }
        }
        
        stage('Rollback') {
            when {
                expression { currentBuild.currentResult == 'FAILURE' }
            }
            steps {
                script {
                    echo "Deployment failed. Triggering rollback..."
                    bat """
                    docker run --rm -v ${pwd()}:/workspace librespace/ansible ansible-playbook -i /workspace/ansible/inventory /workspace/ansible/rollback.yml
                    """
                }
            }
        }
        
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
            }
        }
    }
    post {
        always {
            script {
                echo "APP_VERSION: ${env.APP_VERSION}"
                echo "PREVIOUS_VERSION: ${env.PREVIOUS_VERSION}"
            }
        }
    }
}
