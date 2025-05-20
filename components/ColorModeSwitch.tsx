
import { MoonStar } from '@/components/ui/icons/Moonstar';
import { Sun } from '@/components/ui/icons/Sun';
import { useColorScheme } from '@/hooks/useColorScheme';
import { cn } from '@/utils/cn';
import * as SwitchPrimitives from '@rn-primitives/switch';
import * as React from 'react';
import { Platform } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';

const ColorSwitchWeb = React.forwardRef<SwitchPrimitives.RootRef, SwitchPrimitives.RootProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        'peer flex-row h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed',
        props.checked ? 'bg-primary' : 'bg-input',
        props.disabled && 'opacity-50',
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-md shadow-foreground/5 ring-0 transition-transform',
          props.checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  )
);

ColorSwitchWeb.displayName = 'SwitchWeb';

const RGB_COLORS = {
  light: {
    primary: 'rgb(24, 24, 27)',
    input: 'rgb(228, 228, 231)',
  },
  dark: {
    primary: 'rgb(250, 250, 250)',
    input: 'rgb(39, 39, 42)',
  },
} as const;

const ColorSwitchNative = React.forwardRef<SwitchPrimitives.RootRef, SwitchPrimitives.RootProps>(
  ({ className, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const translateX = useDerivedValue(() => (props.checked ? 18 : 0));
    const animatedRootStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          translateX.value,
          [0, 18],
          [RGB_COLORS[colorScheme].input, RGB_COLORS[colorScheme].primary]
        ),
      };
    });
    const animatedThumbStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: withTiming(translateX.value, { duration: 200 }) }],
    }));
    return (
      <Animated.View
        style={animatedRootStyle}
        className={cn('h-8 w-[46px] rounded-full', props.disabled && 'opacity-50')}
      >
        <SwitchPrimitives.Root
          className={cn(
            'flex-row h-8 w-[46px] shrink-0 items-center rounded-full border-2 border-transparent',
            props.checked ? 'bg-primary' : 'bg-input',
            className
          )}
          {...props}
          ref={ref}
        >
          <Animated.View style={animatedThumbStyle}>
            <SwitchPrimitives.Thumb className={'h-7 w-7 rounded-full bg-background shadow-md shadow-foreground/25 ring-0 flex justify-center items-center'} >
                {props.checked ? <MoonStar size={20} /> : <Sun size={20} />}
            </SwitchPrimitives.Thumb>
          </Animated.View>
        </SwitchPrimitives.Root>
      </Animated.View>
    );
  }
);
ColorSwitchNative.displayName = 'SwitchNative';

const ColorModeSwitch = Platform.select({
  web: ColorSwitchWeb,
  default: ColorSwitchNative,
});

export { ColorModeSwitch };

