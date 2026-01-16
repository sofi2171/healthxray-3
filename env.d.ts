
// Fixed: Removed the manual 'process' declaration as it is already defined in the environment (e.g., via @types/node).
// Augmenting the NodeJS namespace is sufficient to provide types for process.env.API_KEY.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
