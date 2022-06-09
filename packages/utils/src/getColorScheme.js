import tinycolor from 'tinycolor2'

export const getColorScheme = color => {
    return {
        50: tinycolor.mix(color, '#fff', 85).toHexString(),
        100: tinycolor.mix(color, '#fff', 80).toHexString(),
        200: tinycolor.mix(color, '#fff', 70).toHexString(),
        300: tinycolor.mix(color, '#fff', 40).toHexString(),
        400: tinycolor.mix(color, '#fff', 20).toHexString(),
        500: color,
        600: tinycolor.mix(color, '#000', 5).toHexString(),
        700: tinycolor.mix(color, '#000', 10).toHexString(),
        800: tinycolor.mix(color, '#000', 15).toHexString(),
        900: tinycolor.mix(color, '#000', 20).toHexString(),
    }
}
