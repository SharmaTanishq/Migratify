import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  export default function PlatformSelector({ onChange }:{ onChange:(value:string)=>void }) {
    const handleChange = (value: string) => {
      onChange(value);
    }

    return (
      <Select onValueChange={(value)=>handleChange(value)}>
        <SelectTrigger>
          <SelectValue  placeholder="Select a platform" ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Shopify" >Shopify</SelectItem>
          <SelectItem value="big-commerce">BigCommerce</SelectItem>
          <SelectItem value="Magento">Magento</SelectItem>
          <SelectItem value="WooCommerce">WooCommerce</SelectItem>
          <SelectItem value="Vtex">Vtex</SelectItem>
        </SelectContent>
      </Select>
    )
  }