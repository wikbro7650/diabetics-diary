import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import {
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

export default function CurrentValueStatistic({ sgv, direction }) {
  const [prefix, setPrefix] = useState(<ArrowDownOutlined />);

  useEffect(() => {
    switch (direction) {
      case "SingleDown":
      case "Flat":
        setPrefix(<AiOutlineArrowRight />);
        return;
      case "FortyFiveDown":
        setPrefix(<BsArrowDownRight />);
        return;
      case "FortyFiveUp":
        setPrefix(<BsArrowUpRight />);
        return;
      case "DoubleUp":
        setPrefix(<AiOutlineArrowUp />);
        return;
      case "DoubleDown":
        setPrefix(<AiOutlineArrowDown />);
        return;
      default:
        setPrefix(<AiOutlineArrowRight />);
        return;
    }
  }, [sgv, direction]);

  return (
    <div>
      <Statistic
        value={sgv}
        valueStyle={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          fontSize: "40px",
        }}
        prefix={prefix}
      />
    </div>
  );
}
