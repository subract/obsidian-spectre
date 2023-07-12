import { App, PluginSettingTab, Setting } from 'obsidian';
import SpectrePlugin from './main';

export interface spectrePluginSettings {
	ghostApiUrl: string,
	ghostAdminApiKey: string
}

export const DEFAULT_SETTINGS: spectrePluginSettings = {
	ghostApiUrl: "",
	ghostAdminApiKey: ""
}

export class SpectreSettingTab extends PluginSettingTab {
	plugin: SpectrePlugin;

	constructor(app: App, plugin: SpectrePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Spectre settings'});
		containerEl.createEl('p', {text: 'To set up, go to the Ghost admin panel > Settings > Integrations > Add custom integration.'});

		new Setting(containerEl)
			.setName('Ghost API URL')
			.setDesc('Copied from integration settings')
			.addText(text => text
				.setPlaceholder('https://example.com')
				.setValue(this.plugin.settings.ghostApiUrl)
				.onChange(async (value) => {
					this.plugin.settings.ghostApiUrl = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Ghost Admin API key')
			.setDesc('Copied from integration settings')
			.addText(text => text
				.setPlaceholder('')
				.setValue(this.plugin.settings.ghostAdminApiKey)
				.onChange(async (value) => {
					this.plugin.settings.ghostAdminApiKey = value;
					await this.plugin.saveSettings();
				}));
	}
}
