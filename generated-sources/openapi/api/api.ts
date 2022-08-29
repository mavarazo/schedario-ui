export * from './file.service';
import { FileService } from './file.service';
export * from './tag.service';
import { TagService } from './tag.service';
export const APIS = [FileService, TagService];
