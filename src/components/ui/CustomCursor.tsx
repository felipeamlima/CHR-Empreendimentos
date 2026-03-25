import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsActive(true);
        const handleMouseUp = () => setIsActive(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
            <motion.div
                className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isActive ? 'active' : ''}`}
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
        </>
    );
}
