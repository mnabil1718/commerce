export function getFullNameInitial(full_name: string): string {
    let initials = "";
    const split = full_name.trim().split(" ");

    if (split[0]) {
        const firstL = split[0][0].toUpperCase()
        initials += firstL;
    }

    if (split[1]) {
        const lastL = split[1][0].toUpperCase();
        initials += lastL;
    }

    return initials;
}