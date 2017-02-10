import Translator from '../../libs/Translator';
import ProjectJsonApiBodyReader from '../reader/ProjectJsonApiBodyReader';

export default class ProjectTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ProjectJsonApiBodyReader(data);

        const id          = bodyReader.value('id');
        const name        = bodyReader.value('name');
        const category    = bodyReader.value('category');
        const projectType = bodyReader.value('projectTypes');
        const feature     = bodyReader.value('feature');
        const logo        = bodyReader.value('logo');
        const minPrice    = bodyReader.value('minPrice');
        const maxPrice    = bodyReader.value('maxPrice');
        const description = bodyReader.value('description');
        const attachments = bodyReader.value('attachments');
        const slides      = bodyReader.value('slides');
        const prices      = bodyReader.value('prices');
        const applyCount  = bodyReader.value('applyCount');
        const updateTime  = bodyReader.value('updateTime');
        const createTime  = bodyReader.value('createTime');
        const statusTime  = bodyReader.value('statusTime');
        const status      = bodyReader.value('status');
        const userId      = bodyReader.value('saasUsers');


        return {
            id,
            name,
            category,
            projectType,
            feature,
            logo,
            minPrice,
            maxPrice,
            description,
            attachments,
            slides,
            prices,
            applyCount,
            updateTime,
            createTime,
            statusTime,
            status,
            userId
        };
    }
}