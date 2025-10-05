pipeline {
  agent { label 'playwright-agent' }

  options {
    buildDiscarder(logRotator(
      daysToKeepStr: '30',
      numToKeepStr: '20',
      artifactDaysToKeepStr: '30',
      artifactNumToKeepStr: '10'
    ))
    timeout(time: 60, unit: 'MINUTES')

    // note: retains current behavior (stops subsequent stages after UNSTABLE)
    skipStagesAfterUnstable()
  }

  environment {
    CI = 'true'
    ENV = 'prod_config'
    PLAYWRIGHT_REPORT_DIR = 'playwright-report'
    REPO_URL = 'https://github.com/1992Prince/pw-e2e-framework.git'
    EMAIL_RECIPIENTS = 'princepandey155@gmail.com'
  }

  stages {
    stage('Prepare') {
      steps {
        echo "Cleaning workspace and preparing..."
        deleteDir()
      }
    }

    stage('Checkout') {
      steps {
        git branch: 'main', url: env.REPO_URL
      }
    }

    stage('Install & Playwright Setup') {
      steps {
        bat """
        rem ensure npm modules are installed
        call npm ci

        rem install playwright browsers (with dependencies)
        call npx playwright install --with-deps
        """
      }
    }

    stage('Run Playwright Tests') {
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
          bat """
          rem set env and run tests
          set "ENV=${ENV}"
          call npx playwright test --project=advantage-app --headed --reporter=html
          """
        }
      }
    }

    // Removed the separate "Archive & Publish Report" stage to avoid it being skipped
  }

  post {
    // This always block runs in success / unstable / failed cases (as long as workspace/agent still available)
    always {
      script {
        // ensure these post steps don't fail the pipeline; log failures instead
        try {
          echo "=== Post: listing workspace before archiving/publishing ==="
          bat 'echo ==== WORKSPACE ROOT ==== & dir /s'

          // archive everything under playwright-report (won't fail build if missing because we allow missing later)
          // using onlyIfSuccessful:false so archiving in post works regardless of build status
          archiveArtifacts artifacts: "${PLAYWRIGHT_REPORT_DIR}/**", onlyIfSuccessful: false, fingerprint: true

          // publish HTML report - set allowMissing true to avoid failing when index.html missing
          publishHTML(target: [
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: "${PLAYWRIGHT_REPORT_DIR}",
            reportFiles: 'index.html',
            reportName: 'Playwright HTML Report'
          ])

          echo "Report archive & publish attempted in post(always)."
        } catch (err) {
          // Do not fail the post block; just log the error
          echo "WARNING: error while archiving/publishing report in post(always): ${err}"
        }
      }
    }

    success {
      script {
        def reportFile = "${PLAYWRIGHT_REPORT_DIR}/index.html"
        def bodyHtml = "<p>Playwright HTML report not found in workspace.</p>"
        if (fileExists(reportFile)) {
          bodyHtml = readFile(reportFile)
        }
        emailext (
          subject: "[Jenkins] ${env.JOB_NAME} #${env.BUILD_NUMBER} - SUCCESS",
          body: bodyHtml,
          mimeType: 'text/html',
          to: env.EMAIL_RECIPIENTS,
          attachLog: true,
          attachmentsPattern: (fileExists(reportFile) ? "${PLAYWRIGHT_REPORT_DIR}/index.html" : '')
        )
      }
    }

    unstable {
      script {
        def reportFile = "${PLAYWRIGHT_REPORT_DIR}/index.html"
        def body = """
          <p><b>Build Unstable:</b> ${env.JOB_NAME} #${env.BUILD_NUMBER}</p>
          <p>Console: <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
        """
        emailext (
          subject: "[Jenkins] ${env.JOB_NAME} #${env.BUILD_NUMBER} - UNSTABLE",
          body: body,
          mimeType: 'text/html',
          to: env.EMAIL_RECIPIENTS,
          attachLog: true,
          attachmentsPattern: (fileExists(reportFile) ? "${PLAYWRIGHT_REPORT_DIR}/index.html" : '')
        )
      }
    }

    failure {
      script {
        def reportFile = "${PLAYWRIGHT_REPORT_DIR}/index.html"
        def failureBody = """
          <p><b>Build Failed:</b> ${env.JOB_NAME} #${env.BUILD_NUMBER}</p>
          <p>Console: <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
        """
        emailext (
          subject: "[Jenkins] ${env.JOB_NAME} #${env.BUILD_NUMBER} - FAILURE",
          body: failureBody,
          mimeType: 'text/html',
          to: env.EMAIL_RECIPIENTS,
          attachLog: true,
          attachmentsPattern: (fileExists(reportFile) ? "${PLAYWRIGHT_REPORT_DIR}/index.html" : '')
        )
      }
    }

    cleanup {
      echo "Post-run cleanup."
    }
  }
}
