import { Link } from 'react-router-dom';
import { LuChevronRight } from 'react-icons/lu';
import PropTypes from 'prop-types';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex text-sm md:text-base text-text-gray/60">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <LuChevronRight className="mx-2" />}
          {item.link ? (
            <Link to={item.link} className="hover:text-primary-green">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default Breadcrumb;
