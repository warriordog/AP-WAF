export type JsonValue = number | boolean | string | null;
export type JsonObject = { [property: string]: Json | undefined };
export type Json = JsonValue | JsonObject | Json[];
