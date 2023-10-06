export class Group {
  constructor(
    public id: number,
    public groupName: string,
    public permissions: string[] = [],
    public blacklistedPermissions: string[] = []
  ) {}
}
