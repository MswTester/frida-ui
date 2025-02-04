import styled, { css } from 'styled-components';
import { cvt } from '../../utils/styler';

export interface IPaddingMarginMixin {
    $padding?: string;
    $margin?: string;
    $pt?: string;
    $pr?: string;
    $pb?: string;
    $pl?: string;
    $mt?: string;
    $mr?: string;
    $mb?: string;
    $ml?: string;
}

export const paddingMarginMixin = css<IPaddingMarginMixin>`
    padding: ${p => cvt(p.$padding || '')};
    margin: ${p => cvt(p.$margin || '')};
    padding-top: ${p => cvt(p.$pt || '')};
    padding-right: ${p => cvt(p.$pr || '')};
    padding-bottom: ${p => cvt(p.$pb || '')};
    padding-left: ${p => cvt(p.$pl || '')};
    margin-top: ${p => cvt(p.$mt || '')};
    margin-right: ${p => cvt(p.$mr || '')};
    margin-bottom: ${p => cvt(p.$mb || '')};
    margin-left: ${p => cvt(p.$ml || '')};
`;

export interface ISizeMixin {
    $width?: string;
    $height?: string;
    $minWidth?: string;
    $minHeight?: string;
    $maxWidth?: string;
    $maxHeight?: string;
}

export const sizeMixin = css<ISizeMixin>`
    width: ${p => cvt(p.$width || 'auto')};
    height: ${p => cvt(p.$height || 'auto')};
    min-width: ${p => cvt(p.$minWidth || '')};
    min-height: ${p => cvt(p.$minHeight || '')};
    max-width: ${p => cvt(p.$maxWidth || '')};
    max-height: ${p => cvt(p.$maxHeight || '')};
`;

export interface ICommonStyleMixin {
    $color?: string;
    $size?: string;
    $weight?: string;
    $background?: string;
    $border?: string;
    $bt?: string;
    $br?: string;
    $bb?: string;
    $bl?: string;
    $rounded?: string;
}

export const commonStyleMixin = css<ICommonStyleMixin>`
    color: ${p => cvt(p.$color || 'content')};
    font-size: ${p => cvt(p.$size || 'body')};
    font-weight: ${p => cvt(p.$weight || '400')};
    background-color: ${p => cvt(p.$background || 'transparent')};
    border: ${p => cvt(p.$border || 'none')};
    border-top: ${p => cvt(p.$bt || '')};
    border-right: ${p => cvt(p.$br || '')};
    border-bottom: ${p => cvt(p.$bb || '')};
    border-left: ${p => cvt(p.$bl || '')};
    border-radius: ${p => cvt(p.$rounded || '')};
`;

export interface IFlexMixin {
    $justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | string;
    $items?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch" | string;
    $wrap?: "nowrap" | "wrap" | "wrap-reverse" | string;
    $gap?: string;
}

export const flexMixin = css<IFlexMixin>`
    display: flex;
    justify-content: ${p => cvt(p.$justify || 'center')};
    align-items: ${p => cvt(p.$items || 'center')};
    flex-wrap: ${p => p.$wrap || ''};
    gap: ${p => cvt(p.$gap || '')};
`;

const Div = styled.div<{
    $absolute?: boolean;
    $relative?: boolean;
    $color?: string;
} & IPaddingMarginMixin>`
    ${paddingMarginMixin}
    position: ${p => (p.$absolute ? 'absolute' : p.$relative ? 'relative' : '')};
    color: ${p => cvt(p.$color || '')};
`;

const Link = styled.a<IPaddingMarginMixin & ISizeMixin>`
    ${paddingMarginMixin}
    ${sizeMixin}
    text-decoration: none;
`;

const Button = styled.button<IPaddingMarginMixin & ISizeMixin & ICommonStyleMixin>`
    ${paddingMarginMixin}
    ${sizeMixin}
    ${commonStyleMixin}
    cursor: pointer;
    outline: none;
    text-align: center;
`;

const Input = styled.input<{
    $center?: boolean;
} & IPaddingMarginMixin & ISizeMixin & ICommonStyleMixin>`
    ${paddingMarginMixin}
    ${sizeMixin}
    ${commonStyleMixin}
    outline: none;
    text-align: ${p => (p.$center ? 'center' : 'left')};
`;

const TextArea = styled.textarea<{
    $center?: boolean;
} & IPaddingMarginMixin & ISizeMixin & ICommonStyleMixin>`
    ${paddingMarginMixin}
    ${sizeMixin}
    ${commonStyleMixin}
    outline: none;
    text-align: ${p => (p.$center ? 'center' : 'left')};
`;

const Select = styled.select<{
    $center?: boolean;
} & IPaddingMarginMixin & ISizeMixin & ICommonStyleMixin>`
    ${paddingMarginMixin}
    ${sizeMixin}
    ${commonStyleMixin}
    outline: none;
    text-align: ${p => (p.$center ? 'center' : 'left')};
`;

const Box = styled(Div)<ISizeMixin & ICommonStyleMixin>`
    ${sizeMixin}
    ${commonStyleMixin}
`;

const Image = styled.img<{
    $rounded?: string;
} & ISizeMixin>`
    ${sizeMixin}
    border-radius: ${p => cvt(p.$rounded || '')};
`;

const Video = styled.video<{
    $rounded?: string;
} & ISizeMixin>`
    ${sizeMixin}
    border-radius: ${p => cvt(p.$rounded || '')};
`;

const Flex = styled(Div)<{
    $background?: string;
    $direction?: 'row' | 'column';
} & IFlexMixin & ISizeMixin>`
    ${flexMixin}
    width: ${p => cvt(p.$width || '100%')};
    height: ${p => cvt(p.$height || 'auto')};
    background-color: ${p => cvt(p.$background || 'transparent')};
    flex-direction: ${p => p.$direction || 'row'};
`;

const Row = styled(Flex)<{
    $reverse?: boolean;
}>`
    flex-direction: ${p => (p.$reverse ? 'row-reverse' : 'row')};
`;

const Column = styled(Flex)<{
    $reverse?: boolean;
}>`
    flex-direction: ${p => (p.$reverse ? 'column-reverse' : 'column')};
`;

const Container = styled(Div)<{
    $center?: boolean;
    $background?: string;
    $scroll?: boolean;
    $scrollX?: boolean;
    $gap?: string;
    $rounded?: string;
    $wrap?: boolean;
    $height?: string;
    $minHeight?: string;
    $maxHeight?: string;
}>`
    display: flex;
    flex-direction: ${p => p.$wrap ? 'row' : 'column'};
    flex-wrap: ${p => p.$wrap ? 'wrap' : ''};
    gap: ${p => cvt(p.$gap || '')};
    justify-content: ${p => (!p.$scroll && p.$center ? 'center' : 'flex-start')};
    align-items: ${p => (p.$center ? 'center' : 'flex-start')};
    background-color: ${p => cvt(p.$background || 'transparent')};
    overflow-y: ${p => (p.$scroll ? 'auto' : 'hidden')};
    overflow-x: ${p => (p.$scrollX ? 'auto' : 'hidden')};
    border-radius: ${p => cvt(p.$rounded || '')};
    width: 100%;
    height: ${p => cvt(p.$height || '100%')};
    max-width: 100%;
    min-height: ${p => cvt(p.$minHeight || 'auto')};
    max-height: ${p => cvt(p.$maxHeight || '100%')};
    flex: 1;
`;

const Overlay = styled(Container)<{
    $color?: string;
    $opacity?: number;
}>`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${p => cvt(p.$color || 'transparent')};
    opacity: ${p => cvt(p.$opacity || 1)};
`;

type FloatPosition = 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';

const Float = styled(Div)<{
    $position?: FloatPosition;
    $distance?: string;
} & ISizeMixin>`
    ${sizeMixin}
    position: fixed;
    top: ${p =>
        ['top', 'top-right', 'top-left'].includes(p.$position || '')
            ? cvt(p.$distance || '0')
            : p.$position === 'center'
            ? '50%'
            : 'auto'};
    right: ${p =>
        ['right', 'top-right', 'bottom-right'].includes(p.$position || '')
            ? cvt(p.$distance || '0')
            : 'auto'};
    bottom: ${p =>
        ['bottom', 'bottom-right', 'bottom-left'].includes(p.$position || '')
            ? cvt(p.$distance || '0')
            : 'auto'};
    left: ${p =>
        ['left', 'top-left', 'bottom-left'].includes(p.$position || '')
            ? cvt(p.$distance || '0')
            : p.$position === 'center'
            ? '50%'
            : 'auto'};
    transform: ${p => (p.$position === 'center' ? 'translate(-50%, -50%)' : 'none')};
`;

const Text = styled(Div)<{
    $size?: string;
    $weight?: string;
    $align?: 'left' | 'right' | 'center';
    $transform?: 'uppercase' | 'lowercase' | 'capitalize';
    $color?: string;
} & ISizeMixin>`
    ${sizeMixin}
    font-size: ${p => cvt(p.$size || 'body')};
    font-weight: ${p => cvt(p.$weight || '400')};
    text-align: ${p => p.$align || ""};
    text-transform: ${p => p.$transform || 'none'};
    color: ${p => cvt(p.$color || 'content')};
`;

export {
    Div,
    Link,
    Button,
    Input,
    TextArea,
    Select,
    Box,
    Image,
    Video,
    Flex,
    Row,
    Column,
    Container,
    Overlay,
    Float,
    Text,
};
