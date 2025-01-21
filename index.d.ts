export interface GenuaryElement {
    title: string
    alias: string
    description?: string
    color?: string
}

export interface WrapperInstanceOpts {
    title: string
    alias: string
    description: string
    elements: GenuaryElement[]
}


export interface GenuaryParams {
    seed: string
    a: number
    b: number
    c: number
    increment: number
    iterations: number
}
