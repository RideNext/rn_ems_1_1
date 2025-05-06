import React from 'react';
import '../style/DateTimeRange.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {darkTheme, lightTheme} from "../utils/StyleUtils";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
class DateField extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeDateTextHandler = this.onChangeDateTextHandler.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChangeDateTextHandler(event) {
    this.props.onChangeDateTextHandlerCallback(
      event.target.value,
      this.props.mode,
    );
  }

  onBlur() {
    this.props.dateTextFieldCallback(this.props.mode);
  }

  onClick() {
    if (this.props.mode === 'start') {
      this.props.changeSelectingModeCallback(true);
    } else {
      this.props.changeSelectingModeCallback(false);
    }
  }

  render() {

    let theme = this.props.darkMode ? darkTheme : lightTheme;
    return (
      <InputGroup onClick={this.onClick} style={{ cursor: 'pointer' }}>
        <CalendarMonthIcon style={{marginRight:'7px',color:'blue',fontSize:'22px',paddingtop:'30px'}} />
        <FormControl
          className="inputDate"
          id={"DateTimeInput_" + this.props.mode}
          style={theme}
          type="text"
          value={this.props.dateLabel}
          onChange={this.onChangeDateTextHandler}
          onBlur={this.onBlur}
        />
      </InputGroup>
    );
  }
}

DateField.propTypes = {
  changeSelectingModeCallback: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  dateLabel: PropTypes.string.isRequired,
  dateTextFieldCallback: PropTypes.func.isRequired,
  onChangeDateTextHandlerCallback: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};
export default DateField;
