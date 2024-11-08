export interface I_Card {
    uuid: string
    content: string
    isOpen?: boolean
    isComplete?: boolean
    closeDelaySec?: number
}