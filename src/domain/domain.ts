export type Domain = string[];

export function parseDomain(host: string): Domain {
    // foo.Example.COM -> com.example.foo
    return host.toLowerCase().split('.').reverse();
}

export function domainMatches(subject: Domain, target: Domain): boolean {
    // Quick pre-check
    if (target.length > subject.length)
        return false;

    for (let i = 0; i < target.length; i++) {
        if (target[i] !== subject[i])
            return false;
    }

    return true;
}
