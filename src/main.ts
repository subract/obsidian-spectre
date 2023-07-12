import { Editor, MarkdownView, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, SpectreSettingTab, spectrePluginSettings } from './settings';
import { checkConnection } from './ghost';

export default class SpectrePlugin extends Plugin {
	settings: spectrePluginSettings;

	async onload() {
		await this.loadSettings();

		// Create ribbon icon
		this.addRibbonIcon('ghost', 'Publish to Ghost', (evt: MouseEvent) => {
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (!view) return false;
			checkConnection(view, this.settings)
		});

		// Add the publish command
		this.addCommand({
			id: 'publish-to-ghost',
			name: 'Publish to Ghost',
			editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
				// Check if in a markdown view
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!markdownView) return false;

				// If checking, this is all we need to do
				// Otherwise, continue publishing
				if (checking) return true;

				checkConnection(view, this.settings)

			}
		});

		// Create settings
		this.addSettingTab(new SpectreSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

