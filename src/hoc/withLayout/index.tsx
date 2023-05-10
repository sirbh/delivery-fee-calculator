import { ComponentType } from 'react';
import Navbar from '../../components/nav';

type LayoutParams = {
    k: string;
};

/**
 * @param {ComponentType} Component Component that should contained inside layout
 */
function withLayout<T extends LayoutParams>(Component: ComponentType<T>) {
    return function ComponentWithLayout(
        componentProps: Omit<T, keyof LayoutParams>
    ) {
        return (
            <>
                <Navbar />
                <Component {...(componentProps as T)} />
            </>
        );
    };
}

export default withLayout;
