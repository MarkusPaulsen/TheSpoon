//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="RxJs">
import {of} from "rxjs";
import {map} from "rxjs/operators";
//</editor-fold>

class TagItem extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const thisTemp = this;
        const modal = thisTemp.props.modal;
        of(1)
            .pipe(map(() => {
                return thisTemp.props.tag
            }))
            .subscribe(
                (next) => {
                    if(thisTemp.props.added) {
                        modal.setState({
                            chosenTags: modal.state.chosenTags.filter((tag) => {
                                return tag !== next
                            })
                        })
                    }
                    else {
                        if(modal.state.chosenTags.find((tag) => {
                            return tag === next
                        }) == null && modal.state.chosenTags.length < 4){
                            modal.setState({
                                chosenTags: modal.state.chosenTags.concat([next])
                            })
                        }
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    //<editor-fold desc="Render">
    render() {
        // noinspection JSLint
        return (
            <li onClick={this.handleClick}>{this.props.tag}</li>
        );
    }
    //</editor-fold>
}

export default TagItem;