import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import "./DarkModeToggle.scss"

const CheckedIcon = () => <>🌜</>;
const UncheckedIcon = () => <>🌞</>;

const DarkModeToggle = (props) => {

    const [toggle, setToggle] = useState(false);
    const { defaultChecked, onChange, disabled, className } = props;

    useEffect(() => {
        if (defaultChecked) {
            setToggle(defaultChecked)
        }
    }, [defaultChecked]);

    const triggerToggle = () => {
        if ( disabled ) {
            return;
        }

        setToggle(!toggle);

        if ( typeof onChange === 'function' ) {
            onChange(!toggle);
        }
    }

    const getIcon = (type) => {
        const { icons } = props;
        if ( ! icons ) {
            return null;
        }

        return icons[type] === undefined ?
            DarkModeToggle.defaultProps.icons[type] :
            icons[type];
    }

    const toggleClasses = classNames('wrg-toggle', {
        'wrg-toggle--checked': toggle,
        'wrg-toggle--disabled': disabled
    }, className);

    if (toggle) {
        console.log('setting toggle')
        document.body.classList.remove("DarkMode");
        document.body.classList.add("LightMode");
    }
    else {
        document.body.classList.remove("LightMode");
        document.body.classList.add("DarkMode");
    }

    return (
        <div onClick={triggerToggle} className={toggleClasses}>
            <div className="wrg-toggle-container">
                <div className="wrg-toggle-check">
                    <span>{ getIcon('checked') }</span>
                </div>
                <div className="wrg-toggle-uncheck">
                    <span>{ getIcon('unchecked') }</span>
                </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <input type="checkbox" aria-label="Toggle Button" className="wrg-toggle-input" />
        </div>
    );
}

DarkModeToggle.defaultProps = {
    icons: {
        checked: <CheckedIcon />, 
        unchecked: <UncheckedIcon />
    }
};

DarkModeToggle.propTypes = {
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    icons: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            checked: PropTypes.node,
            unchecked: PropTypes.node
        })
    ])
};

export default DarkModeToggle;