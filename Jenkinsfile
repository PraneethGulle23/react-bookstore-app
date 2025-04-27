pipeline {
    agent any
    environment {
        // Use bat for Windows, sh for Linux
        IS_UNIX = isUnix()
        // Default version if no tags exist
        APP_VERSION = bat(script: 'git describe --tags --abbrev=0 || echo "latest"', returnStdout: true).trim()
        PREVIOUS_VERSION = bat(script: 'git tag --sort=-creatordate | head -n 2 | tail -n 1 || echo "latest"', returnStdout: true).trim()
    }
    stages {
        stage('Checkout & Setup') {
            steps {
                checkout scm
                script {
                    if (env.IS_UNIX.toBoolean()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }
        
        stage('Build React') {
            steps {
                script {
                    if (env.IS_UNIX.toBoolean()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }
        
        stage('Deploy with Ansible') {
            when {
                expression { env.IS_UNIX.toBoolean() } // Ansible typically runs on Linux
            }
            steps {
                script {
                    try {
                        ansiblePlaybook(
                            playbook: 'ansible/deploy-react.yml',
                            inventory: 'ansible/inventory.ini',
                            credentialsId: 'ansible-ssh-key',
                            extras: '-e "app_version=${APP_VERSION}"'
                        )
                    } catch (Exception err) {
                        echo "Rolling back to ${PREVIOUS_VERSION}"
                        ansiblePlaybook(
                            playbook: 'ansible/deploy-react.yml',
                            inventory: 'ansible/inventory.ini',
                            credentialsId: 'ansible-ssh-key',
                            extras: '-e "app_version=${PREVIOUS_VERSION}"'
                        )
                        error("Deployment failed. Rolled back to ${PREVIOUS_VERSION}")
                    }
                }
            }
        }
    }
    post {
        always {
            echo "Build ${currentBuild.result ?: 'SUCCESS'}"
            // Slack/email notifications would go here
        }
    }
}
