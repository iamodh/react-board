import PropTypes from "prop-types";

ListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
};

export default function ListItem({ item }) {
  return <li>{item.title}</li>;
}
