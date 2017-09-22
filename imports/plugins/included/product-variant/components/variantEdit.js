import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactionProduct } from "/lib/api";
import { Components } from "@reactioncommerce/reaction-components";

class VariantEdit extends Component {
  static propTypes = {
    childVariants: PropTypes.arrayOf(PropTypes.object),
    handleCreateNewChildVariant: PropTypes.func,
    variant: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      childVariants: props.childVariants,
      variant: props.variant || ReactionProduct.selectedTopVariant()
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      childVariants: nextProps.childVariants,
      variant: nextProps.variant
    });
  }

  handleCreateNewChildVariant = () => {
    if (this.props.handleCreateNewChildVariant) {
      this.props.handleCreateNewChildVariant(this.state.variant);
    }
  }

  renderVariant() {
    const variant = this.state.variant;

    return (
      <Components.VariantForm
        variant={variant}
        type={"variant"}
      />
    );
  }

  renderOptionsCard() {
    return (
      <Components.CardGroup>
        <Components.Card
          expandable={false}
          name={"variantOptions"}
        >
          <Components.CardHeader
            i18nKeyTitle="productDetailEdit.variantsDetails"
            title="Variant Options"
          >
            <Components.Button
              icon="plus"
              className="rui btn btn-default btn-clone-variant flat"
              tooltip="Add Option"
              onClick={this.handleCreateNewChildVariant}
            />
          </Components.CardHeader>
        </Components.Card>
        {this.renderChildVariants()}
      </Components.CardGroup>
    );
  }

  renderChildVariants() {
    const childVariants = this.state.childVariants;

    return childVariants.map((childVariant, index) => {
      return (
        <Components.VariantForm
          key={index}
          variant={childVariant}
          type={"option"}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderVariant()}
        {this.renderOptionsCard()}
      </div>
    );
  }
}

export default VariantEdit;
