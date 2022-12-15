import {SetMetadata} from "@nestjs/common";

export const RolesKey = "roles"
export const Roles = (...roles: string[]) => SetMetadata(RolesKey, roles)