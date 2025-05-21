export const formatDollarValue = (value: string | undefined) => {
    if(!value || value === '') {
      return `$0.00`
    }
    const len = value.length
    switch (len) {
      case 0:
        return '$0.00'
      case 1: 
        return `$0.0${value}`
      case 2: 
        return `$0.${value}`
      default:
        return `$${value.substring(0, len-2)}.${value.substring(len-2)}`
    }
}