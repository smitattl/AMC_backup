import React, { useState } from "react";
import PropTypes from "prop-types";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import "./myselect.css";

export const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
    whiteSpace : "normal",
    overflow: "auto",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      {rest.isMulti && (
        <input
          style={{ marginRight: "10px" }}
          type="checkbox"
          checked={isSelected}
        />
      )}
      {children}
    </components.Option>
  );
};

// const customStyles = {
//   option: styles => ({ 
//     ...styles,                
//   }),
//   menu: styles => ({ 
//     ...styles,                 
//   })                 
// };

const colourStyles = (isValid) => {
  return {
    control: (styles) => (
      { 
        ...styles,
        borderColor:isValid ? '#cccccc' :  '#ff0000'
      }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
      };
    },
  }
};

const MySelect = (props) => {
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        options={props.options.length > 0 ? [props.allOption, ...props.options] : []}
        onChange={(selected, event) => {
          if (selected !== null && selected.length > 0) {
            if (selected[selected.length - 1].value === props.allOption.value) {
              return props.onChange([props.allOption, ...props.options]);
            }
            let result = [];
            if (selected.length === props.options.length) {
              if (selected.includes(props.allOption)) {
                result = selected.filter(
                  (option) => option.value !== props.allOption.value
                );
              } else if (event.action === "select-option") {
                result = [props.allOption, ...props.options];
              }
              return props.onChange(result);
            }
          }
          return props.onChange(selected);
        }}
        // styles={customStyles}
        styles={colourStyles(props.isValid)}
        classNamePrefix={`option-cls`}
      />
    );
  }

  return <ReactSelect 
    {...props} 
    styles={colourStyles(props.isValid)}
    classNamePrefix={`option-cls`}
  />;
};

MySelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  customSelectedLabel: PropTypes.string,
  isValid: PropTypes.bool
};

MySelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*",
  },
  customSelectedLabel: "Selected All",
  isValid:true
};

export const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

export const ValueContainer = ({ children, ...props }) => {
  let [values, input] = children;
  // const { props } = input;
  // console.log("allOption", allOption);
  const selectAllLabel =
    input["props"]["selectProps"]["allOption"]["label"] || "";
  // console.log("selectAllLabel", selectAllLabel);
  const customAllSelectedLabel =
    input["props"]["selectProps"]["customSelectedLabel"];
  // console.log("input", input);
  if (Array.isArray(values)) {
    const val = (i = Number) => values[i].props.children;
    const { length } = values;
    // console.log("values", values);
    // console.log("val",length,val(0));
    switch (length) {
      case 1:
        values = `${val(0)} `;
        break;
      default:
        let otherCount = length - 1;
        const findAllExist = values.find(
          (eachVal, key) => val(key) == selectAllLabel
        );
        if (findAllExist) {
          otherCount = otherCount - 1;
        }
        // console.log(val(0), val(0) == selectAllLabel, "select all condition");
        if (findAllExist && customAllSelectedLabel !== 'None') {
          values = customAllSelectedLabel;
        } else {
          values = `${val(0) == selectAllLabel ? val(1) : val(0)}${
            otherCount > 0 ? `+ ${otherCount}` : ""
          } `;
        }
        break;
    }
  }
  return (
    <components.ValueContainer {...props}>
      {values}
      {input}
    </components.ValueContainer>
  );
};

export default MySelect;