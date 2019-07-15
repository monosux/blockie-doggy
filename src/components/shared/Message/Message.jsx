import React from 'react';
import classNames from 'classnames';

class Loading extends React.Component {
    createEmoji = () => {
        let emoji_list = {
            flash: '⚡',
            rainbow: '🌈',
            crying: '😭',
            dog: '🐶',
            thinking: '🤔',
            rocket: '🚀',
            wizard: '🧙‍',
            carousel: '🎠',
            plug: '🔌',
            hi: '👋',
            search: '🔎',
            doc: '👩‍⚕️'
        };
        let current_emoji = this.props.emoji ? this.props.emoji : 'flash';
        return <span role="img" aria-label={current_emoji}>{emoji_list[current_emoji]}</span>;
    }

    createText = () => {
        let classes = this.props.messageClasses || [];
        if (Array.isArray(this.props.message)) {
            return this.props.message.map((value, key) => {
                return <p className={classNames(...classes)} key={key}>{value}</p>;
            });
        } else {
            return <p className={classNames(...classes)}>{this.props.message}</p>;
        }
    }

    createWrapper = () => {
        if (this.props.noWrap) {
            return <React.Fragment>{this.createEmoji()}{this.createText()}</React.Fragment>;
        } else {
            let classes = this.props.wrapperClasses || [];
            return <div className={classNames(...classes)}>{this.createEmoji()}{this.createText()}</div>;
        }
    }

    render() {
        return this.createWrapper();        
    }
}

export default Loading;