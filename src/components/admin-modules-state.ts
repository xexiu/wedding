import { ModuleDefinition, ModuleId } from "@/config/modules";

export function moveItem(list: ModuleId[], fromIndex: number, toIndex: number): ModuleId[] {
  const next = [...list];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

export function toggleModule(flags: ModuleDefinition[], moduleId: ModuleId): ModuleDefinition[] {
  return flags.map((item) => (item.id === moduleId ? { ...item, enabled: !item.enabled } : item));
}
