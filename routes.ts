/**  
 * An array of routes that are accessible to the public
 * These routes do not require any kind of authentication
 * @type {string[]}
*/

export const publicRoutes = [
    "/",
]

/**  
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
*/

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
]

/**  
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
*/
export const apiAuthPrefix = "/api/auth"

/** 
* Default redirect path after logging in
* @type {string}
*/
export const DEFAULT_REDIRECT_AFTER_LOGIN = "/settings"