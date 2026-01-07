import type { TimerPlugin, TimerBus } from "./index";

export class TimerPluginRegistry {
  private plugins = new Map<string, TimerPlugin>();
  private bus: TimerBus;

  constructor(bus: TimerBus) {
    this.bus = bus;
  }

  register(plugin: TimerPlugin) {
    if (this.plugins.has(plugin.id)) {
      console.warn(`[TimerPluginRegistry] Plugin already registered: ${plugin.id}`);
      return;
    }

    plugin.attach(this.bus);
    this.plugins.set(plugin.id, plugin);
  }

  unregister(pluginId: string) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) return;

    plugin.detach();
    this.plugins.delete(pluginId);
  }

  clear() {
    for (const plugin of this.plugins.values()) {
      plugin.detach();
    }
    this.plugins.clear();
  }

  has(pluginId: string) {
    return this.plugins.has(pluginId);
  }
}
