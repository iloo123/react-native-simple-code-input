import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, LayoutAnimation, UIManager } from 'react-native';
import PropTypes from 'prop-types';

const boxStyle = {
    borderBottomWidth: 2, 
    borderColor: 'rgba(102, 51, 255, 100)',
    height: 32,
    width: 32,
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
};
// functional components only render props
const Box = ({ value, key }) => (
    <View style={boxStyle}>
        { !!value && <Text>{value}</Text>}
    </View>
)
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default class PinCode extends React.Component {

    static defaultProps = {
        keyboardType: 'default',
        type: 'easeInEaseOut',
        length: 4,
        onFulFill: () => {},
        onChangeText: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            codeArr: new Array(props.length).fill('')
        };
        this.clearCode = this.clearCode.bind(this);
    }

    componentDidMount() {
        this.props.hasRef && this.props.hasRef(this);
    }

    clearCode() {
        this.setState({ code: '' });
    }

    renderCodeArray() {
        const { codeArr } = this.state;
        const code = this.state.code.split('');
        if (this.props.cuztomize)
            return this.renderCustomize();
        
        return codeArr.map((item, index) => 
            Box({ 
                value: code[index] || item, 
                key: index // key đây
            })
        );
    }

    renderCustomize() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets[this.props.type]);
        const { codeArr } = this.state;
        const code = this.state.code.split('');
        const { renderEmptyComponent, renderValueComponent } = this.props;
        return codeArr.map((item, index) =>  {
            if(code[index])
                return renderValueComponent(code[index])
            return renderEmptyComponent(item)
        });
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={() => {
                    this.input && this.input.focus();
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    {this.renderCodeArray()}
                </View>
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={this.props.autoFocus}
                    keyboardType={this.props.keyboardType}
                    style={{ height: 0 }}
                    ref={ref => { this.input = ref; }}
                    maxLength={this.props.length}
                    onChangeText={value => {
                        this.setState({ code: value }, () => {
                            this.props.onChangeText(value);
                            if (value.length === this.props.length) {
                                Keyboard.dismiss();
                                this.props.onFulFill(this.state.code);
                            }
                        })
                    }}
                    value={this.state.code}
                />
            </TouchableOpacity>
        );
    }
}

PinCode.propTypes = {
    length: PropTypes.number,
    onFulFill: PropTypes.func,
    type: PropTypes.oneOf(['spring', 'linear', 'easeInEaseOut']),
    keyboardType: PropTypes.oneOf(['default', 'numeric', 'phone-pad', 'email-address']),
};
