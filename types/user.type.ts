export type Profile = {
    id: string;
    full_name: string;
    role: 'admin' | 'user';
    avatar: string | null;
}