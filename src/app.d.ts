import type { UserSchema } from "$lib/schemas"

declare global {
    namespace App {
        interface Locals {
            user: UserSchema | null;
        }
        interface PageData {
            currentUser: UserSchema | null;
        }
    }
}