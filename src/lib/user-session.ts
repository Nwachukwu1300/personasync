interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  location?: string;
  bio?: string;
  personalityGoals?: string[];
  profileVisibility: 'public' | 'private';
  xp: number;
  createdAt: string;
}

export class UserSession {
  private static CURRENT_USER_KEY = 'personasync_current_user';
  private static USER_PREFIX = 'personasync_user_';

  // Set the current logged-in user
  static setCurrentUser(username: string): void {
    localStorage.setItem(this.CURRENT_USER_KEY, username);
  }

  // Get the current logged-in user's username
  static getCurrentUsername(): string | null {
    return localStorage.getItem(this.CURRENT_USER_KEY);
  }

  // Get the current logged-in user's full profile
  static getCurrentUser(): UserProfile | null {
    const username = this.getCurrentUsername();
    if (!username) return null;

    const userKey = `${this.USER_PREFIX}${username}`;
    const userData = localStorage.getItem(userKey);
    
    return userData ? JSON.parse(userData) : null;
  }

  // Save user data (for signup or updates)
  static saveUser(userData: UserProfile): void {
    const userKey = `${this.USER_PREFIX}${userData.username}`;
    localStorage.setItem(userKey, JSON.stringify(userData));
  }

  // Add XP to the current user
  static addXP(xpAmount: number): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    currentUser.xp += xpAmount;
    this.saveUser(currentUser);
    return true;
  }

  // Set XP for the current user
  static setXP(xpAmount: number): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    currentUser.xp = xpAmount;
    this.saveUser(currentUser);
    return true;
  }

  // Logout (clear current user)
  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    return this.getCurrentUsername() !== null;
  }

  // Get user by username (for profile pages)
  static getUserByUsername(username: string): UserProfile | null {
    const userKey = `${this.USER_PREFIX}${username}`;
    const userData = localStorage.getItem(userKey);
    
    return userData ? JSON.parse(userData) : null;
  }
} 