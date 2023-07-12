import GhostAdminAPI from '@tryghost/admin-api';
import { spectrePluginSettings } from './settings';
import { MarkdownView } from 'obsidian';

export const checkConnection = async (
    view: MarkdownView, 
    settings: spectrePluginSettings
) => {
    const api = new GhostAdminAPI({
        url: settings.ghostApiUrl,
        key: settings.ghostAdminApiKey,
        version: "v5.0",
    });
    
    // Being blocked by CORS
    // console.log(await api.posts.browse());1
};