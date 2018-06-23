import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

// functional components only render props
const Dash = ({ value, key }) => (
    <View key={key} style={{ paddingHorizontal: 16 }}>
        { !!value ? <Text>{value}</Text> : <Text>_</Text>}
    </View>
)

export default class PinCode extends React.Component {

    static defaultProps = {
        length: 4,
        onFulFill: (value) => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            codeArr: new Array(props.length).fill('')
        };
    }

    renderCodeArray() {
        const { codeArr } = this.state;
        const code = this.state.code.split('');
        return codeArr.map((item, index) => 
            Dash({ 
                value: code[index] || item, 
                key: index // key đây
            })
        );
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
                    style={{ height: 0 }}
                    ref={ref => { this.input = ref; }}
                    maxLength={this.props.length}
                    onChangeText={value => {
                        this.setState({ code: value }, () => {
                            if (value.length === this.props.length) {
                                Keyboard.dismiss();
                                this.props.onFulFill(this.state.code);
                            }
                        })
                    }}
                />
            </TouchableOpacity>
        );
    }
}

PinCode.propTypes = {
    length: PropTypes.number,
    onFulFill: PropTypes.func
};