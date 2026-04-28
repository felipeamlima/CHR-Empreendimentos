import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
    // Raw position — tracks mouse 1:1 (instant, no spring)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Ring trail — spring derived from the raw motion value
    const ringX = useSpring(mouseX, { stiffness: 320, damping: 30, mass: 0.4 });
    const ringY = useSpring(mouseY, { stiffness: 320, damping: 30, mass: 0.4 });

    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleEnter = () => setIsVisible(true);
        const handleLeave = (e: MouseEvent) => {
            // Only hide when leaving the window itself, not when crossing into iframes
            if (!e.relatedTarget && !(e as unknown as { toElement?: Node }).toElement) {
                setIsVisible(false);
            }
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest(
                'a, button, [role="button"], input, textarea, select, label, .interactive'
            );
            setIsHovering(!!interactive);
        };

        const handleDown = () => setIsActive(true);
        const handleUp = () => setIsActive(false);

        window.addEventListener('mousemove', handleMove, { passive: true });
        window.addEventListener('mouseover', handleOver, { passive: true });
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);
        document.documentElement.addEventListener('mouseenter', handleEnter);
        document.documentElement.addEventListener('mouseleave', handleLeave);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseover', handleOver);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
            document.documentElement.removeEventListener('mouseenter', handleEnter);
            document.documentElement.removeEventListener('mouseleave', handleLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
            />
            <motion.div
                className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isActive ? 'active' : ''}`}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
            />
        </>
    );
}
