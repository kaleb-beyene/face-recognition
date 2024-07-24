import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";

export function StatisticsCard2({ color, icon, title, value, footer }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm p-1">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-16 w-16 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-bold text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
    </Card>
  );
}

StatisticsCard2.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard2.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard2.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard2;
