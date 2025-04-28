pipeline {
    agent any
    environment {
        GIT_PATH = "C:\\Program Files\\Git\\bin\\git.exe"
    }
    stages {
        stage('Setup') {
            steps {
                script {
                    // Get version info in a Windows-compatible way
                    def getVersion = bat(
                        script: "@\"${env.GIT_PATH}\" describe --tags --abbrev=0 2>nul || echo latest",
                        returnStdout: true
                    ).trim()
                    env.APP_VERSION = getVersion ?: "latest"
                    
                    // Get previous version
                    def getPrevVersion = bat(
                        script: """
                        @FOR /F "tokens=*" %%i IN ('"${env.GIT_PATH}" tag --sort=-creatordate ^| findstr /r /v "^^$" ^| more +1') DO @(
                            ECHO %%i
                            EXIT /b
                        )
                        """,
                        returnStdout: true
                    ).trim()
                    env.PREVIOUS_VERSION = getPrevVersion ?: "latest"
                    
                    echo "Using APP_VERSION: ${env.APP_VERSION}"
                    echo "Using PREVIOUS_VERSION: ${env.PREVIOUS_VERSION}"
                }
                checkout scm
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
        
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
            }
        }
    }
    post {
        always {
            echo "Build ${currentBuild.result ?: 'SUCCESS'}"
        }
    }
}
