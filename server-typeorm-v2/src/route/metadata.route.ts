import { MetadataController } from '../controller/metaData.controller';

export const metadataRoute = [
  {
    method: 'post',
    route: '/api/metadata/:jobId',
    controller: MetadataController,
    action: 'saveMetaData',
  },
  {
    method: 'get',
    route: '/api/metaData',
    controller: MetadataController,
    action: 'allMetaDatas',
  },
  {
    method: 'get',
    route: '/api/metadata/:id',
    controller: MetadataController,
    action: 'oneMetaData',
  },
  {
    method: 'put',
    route: '/api/metadata/:id',
    controller: MetadataController,
    action: 'updateMetaData',
  },

  {
    method: 'put',
    route: '/api/metadata/:id',
    controller: MetadataController,
    action: 'removeMetaData',
  },
];
