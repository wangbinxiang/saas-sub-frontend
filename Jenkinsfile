node {
    stage 'checkout compose file'
    git([credentialsId: '576f44ca-5da6-4dba-9e3f-a618ceab2623', url: 'https://github.com/chloroplast1983/saas-frontend', branch: 'master'])
    echo 'checkout'
    stage 'test'
    echo 'test'
    stage 'release sandbox'
    dir('deployment/sandbox') {
        sh 'rancher-compose --url ${RANCHER_URL} --access-key ${RANCHER_SANDBOX_ACCESS_KEY} --secret-key ${RANCHER_SANDBOX_SECRET_KEY} --verbose -p saas-frontend up -d --upgrade --confirm-upgrade service'
    }
    echo 'release sandbox'
    stage 'release production'
    timeout(time:2, unit:'DAYS') {
        input message:'Release Production ?', ok: 'Release'
    }
    dir('deployment/production') {
        sh 'rancher-compose --url ${RANCHER_URL} --access-key ${RANCHER_PRODUCTION_ACCESS_KEY} --secret-key ${RANCHER_PRODUCTION_SECRET_KEY} --verbose -p saas-frontend up -d --upgrade --batch-size 1 --interval "30000" --confirm-upgrade service'
    }
    echo 'release production'
}