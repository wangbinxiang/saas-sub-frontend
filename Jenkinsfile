node {
    stage 'checkout compose file'
    git([credentialsId: '576f44ca-5da6-4dba-9e3f-a618ceab2623', url: 'https://github.com/chloroplast1983/saas-sub-frontend', branch: 'master'])
    echo 'checkout'
    stage 'test'
    echo 'test'
    stage '发布候选版本'
    //
    sh 'sudo docker login --username=电商湾 --password=Cmu7yJ69hx5VWnu8 --email=41893204@qq.com registry-internal.cn-hangzhou.aliyuncs.com'
    sh 'sudo docker pull registry-internal.cn-hangzhou.aliyuncs.com/saas/saas-sub-frontend'
    sh 'sudo docker tag $(sudo docker images |grep \'registry-internal.cn-hangzhou.aliyuncs.com/saas/saas-sub-frontend\'|grep \'latest\'|awk \'{print $3}\') registry-internal.cn-hangzhou.aliyuncs.com/saas/saas-sub-frontend:$(cat ./VERSION)'
    sh 'sudo docker push registry-internal.cn-hangzhou.aliyuncs.com/saas/saas-sub-frontend:$(cat ./VERSION)'
    stage 'release sandbox'
    sh 'sed -i "s/VERSION/$(cat VERSION)/g" deployment/sandbox/docker-compose.yml'
    dir('deployment/sandbox') {
        sh 'rancher-compose --url ${RANCHER_URL} --access-key ${RANCHER_SANDBOX_ACCESS_KEY} --secret-key ${RANCHER_SANDBOX_SECRET_KEY} --verbose -p saas-sub-frontend up -d --upgrade --confirm-upgrade service'
    }
    echo 'release sandbox'
    stage 'release production'
    timeout(time:2, unit:'DAYS') {
        input message:'Release Production ?', ok: 'Release'
    }
    sh 'sed -i "s/VERSION/$(cat VERSION)/g" deployment/production/docker-compose.yml'
    dir('deployment/production') {
        sh 'rancher-compose --url ${RANCHER_URL} --access-key ${RANCHER_PRODUCTION_ACCESS_KEY} --secret-key ${RANCHER_PRODUCTION_SECRET_KEY} --verbose -p saas-sub-frontend up -d --upgrade --batch-size 1 --interval "30000" --confirm-upgrade service'
    }
    echo 'release production'
}