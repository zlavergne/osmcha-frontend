// @flow
import React from 'react';
import './dropdown.css';
import onClickOutside from 'react-click-outside';

class DropdownContent extends React.PureComponent {
  isActive = (obj: Object) => {
    for (let v of this.props.value) {
      if (v.label === obj.label) {
        return true;
      }
    }
    return false;
  };
  handleClick = (data: Object) => {
    if (data) {
      var label = data.label;
      if (!label || !this.props.value || !this.props.onChange) return;
      const value = this.props.value;
      let ourObj = data;
      if (!ourObj) return;

      let isRemove = false;
      for (let x = 0; x < value.length; x++) {
        if (value[x].label === label) {
          isRemove = true;
          this.props.onRemove(ourObj);
          this.props.onChange(
            value.slice(0, x).concat(value.slice(x + 1, value.length))
          );
        }
      }

      if (!isRemove) {
        let newArray = value.slice(0, value.length);
        if (!this.props.multi) {
          newArray = [];
        }
        newArray.push(ourObj);
        this.props.onAdd(ourObj);
        this.props.onChange(newArray);
      }
    }
    if (!this.props.multi) {
      this.props.toggleDropdown();
    }
  };
  render() {
    return (
      <div
        className="dropdown-content wmin120 wmax240"
        style={{ display: 'block' }}
      >
        {this.props.options.map((i, k) =>
          <span
            key={k}
            onClick={this.handleClick.bind(null, i)}
            className="flex-parent flex-parent--row flex-parent--center-cross"
          >
            {this.props.multi &&
              <input
                data-label={i.label}
                data-payload={JSON.stringify(i)}
                type="checkbox"
                checked={this.isActive(i)}
                value={i.label}
                className="cursor-pointer  px6 py3"
              />}
            <a
              target={i.href ? '_blank' : '_self'}
              href={i.href || '#'}
              className={` px12 py6 txt-nowrap flex-child--grow cursor-pointer ${this.isActive(
                i
              )
                ? 'is-active color-red'
                : ''}`}
            >
              {i.label}
            </a>
          </span>
        )}
      </div>
    );
  }
}

export class _Dropdown extends React.PureComponent {
  props: {
    className: string,
    disabled: boolean,
    value: Array<Object>,
    onChange: () => any,
    onAdd: (?Object) => any,
    onRemove: (?Object) => any,
    options: Array<Object>,
    display: string,
    multi: boolean
  };

  state = {
    display: false
  };
  handleClickOutside = () => {
    this.setState({
      display: false
    });
  };
  toggleDropdown = () => {
    this.setState({
      display: !this.state.display
    });
  };
  isActive = (obj: Object) => {
    for (let v of this.props.value) {
      if (v.label === obj.label) {
        return true;
      }
    }
    return false;
  };
  render() {
    return (
      <div className={`dropdown mr3 pointer ${this.props.className}`}>
        <span onClick={this.toggleDropdown}>
          {' '}
          {this.props.displayComponent
            ? this.props.displayComponent
            : <span className="btn btn--s bg-white color-gray border border--gray round">
                <span>{this.props.display}</span>
                <svg className="icon inline-block align-middle ">
                  <use xlinkHref="#icon-chevron-down" />
                </svg>
              </span>}
        </span>
        {this.state.display &&
          <DropdownContent
            {...this.props}
            eventTypes={['click', 'touchend']}
            toggleDropdown={this.toggleDropdown}
          />}
      </div>
    );
  }
}

export const Dropdown = onClickOutside(_Dropdown);
