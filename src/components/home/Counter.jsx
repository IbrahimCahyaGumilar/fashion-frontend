import { useEffect, useState } from "react";

function Counter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const speed = target / 100;

        const updateCounter = () => {
            start += speed;

            if (start < target) {
                setCount(Math.floor(start));
                requestAnimationFrame(updateCounter);
            } else {
                setCount(target);
            }
        };

        updateCounter();
    }, [target]);

    return <p className="text-xl md:text-3xl">{count}+</p>;
}

export default Counter;