export class User {
  constructor(
    public id: number,
    public userName: string,
    public permissions: string[] = [],
    public blacklistedPermissions: string[] = [],
    public groups: number[] = []
  ) {}
}
