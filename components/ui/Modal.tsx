import { cn } from '@/utils/cn';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { StyleSheet } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalClose = DialogPrimitive.Close
function Overlay({
    className,
    children,
    ...props
  }: DialogPrimitive.OverlayProps & {
    ref?: React.RefObject<DialogPrimitive.OverlayRef>;
    children?: React.ReactNode;
  }) {
    return (
        <DialogPrimitive.Overlay closeOnPress {...props} style={StyleSheet.absoluteFill} className={className}>
            <Animated.View entering={SlideInDown} exiting={SlideOutDown}>
                {children}
            </Animated.View>

        </DialogPrimitive.Overlay>
    )
  }

function ModalContent({ children, portalHost, transparent, ...props}: DialogPrimitive.ContentProps & {
    ref?: React.RefObject<DialogPrimitive.ContentRef>;
    className?: string,
    portalHost?: string;
    transparent?: boolean
}) {
    
    return (
        <DialogPrimitive.Portal hostName={portalHost}>
            <Overlay className={cn(transparent ? 'bg-transparent' : 'bg-current', 'h-full flex justify-end')}>
                <DialogPrimitive.Content className={props.className} {...props} >
                    {children}
                </DialogPrimitive.Content>
            </Overlay>
        </DialogPrimitive.Portal>
    )
}


export { Modal, ModalClose, ModalContent, ModalTrigger };

