pipeline {
    agent any
    environment {
        // Dynamic version from Git tag (defaults to 'latest' if no tag exists)
        APP_VERSION = sh(script: 'git describe --tags --abbrev=0 || echo "latest"', returnStdout: true).trim()
        // Store previous version for rollback
        PREVIOUS_VERSION = sh(script: 'git tag --sort=-creatordate | head -n 2 | tail -n 1 || echo "latest"', returnStdout: true).trim()
    }
    stages {
        stage('Checkout & Setup') {
            steps {
                checkout scm
                sh 'npm install'  // Install dependencies
            }
        }
        
        stage('Build React') {
            steps {
                sh 'npm run build'  // Create optimized production build
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true  // Save build for rollback
            }
        }
        
        stage('Deploy with Ansible') {
            steps {
                script {
                    try {
                        ansiblePlaybook(
                            playbook: 'ansible/deploy-react.yml',
                            inventory: 'ansible/inventory.ini',
                            extraVars: [
                                "app_version=${APP_VERSION}",
                                "react_app_dir=/var/www/react-bookstore-app",
                                "web_root=/var/www/html/bookstore"  // Where Nginx serves files
                            ],
                            credentialsId: 'ansible-ssh-key'  // Jenkins-stored SSH credential
                        )
                    } catch (Exception err) {
                        echo "🚨 DEPLOYMENT FAILED! Rolling back to ${PREVIOUS_VERSION}"
                        ansiblePlaybook(
                            playbook: 'ansible/deploy-react.yml',
                            inventory: 'ansible/inventory.ini',
                            extraVars: [
                                "app_version=${PREVIOUS_VERSION}",
                                "react_app_dir=/var/www/react-bookstore-app",
                                "web_root=/var/www/html/bookstore"
                            ],
                            credentialsId: 'ansible-ssh-key'
                        )
                        error("❌ Deployment failed. Rolled back to ${PREVIOUS_VERSION}")
                    }
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    def response = sh(script: 'curl -s -o /dev/null -w "%{http_code}" http://your-server-ip', returnStdout: true).trim()
                    if (response != "200") {
                        error("Health check failed (HTTP ${response})")
                    }
                }
            }
        }
    }
    post {
        always {
            slackSend channel: '#deployments',
                     message: "Deployment of ${APP_VERSION} ${currentBuild.result ?: 'SUCCESS'}: ${env.BUILD_URL}"
        }
    }
}
