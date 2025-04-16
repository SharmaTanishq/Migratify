import flowStore from "@/components/Store/store";

import {
  Card,
  
  CardContent,
  
} from "@/components/ui/card"; 
import { ModalStore } from "@/components/Store/modal";

import { cn } from "@/lib/utils";


import DataViewer from "@/components/ViewSchema";

import { useState } from "react";
import GenericDrawerLayout from "../../Layouts/Drawer/demo";

function MailDrawer({ isOpen, id }: { isOpen: boolean; id: string }) {
  const node = flowStore((state) => state.getNode(id));
  const { modalOpen } = ModalStore();


  return (
    <GenericDrawerLayout isOpen={isOpen} node={node} id={id}>
      <div className="w-full ">
        <DataViewer  />
      </div>
    </GenericDrawerLayout>
  );
}

export default MailDrawer;

export const VTEX_ORDER_SCHEMA = {
  orderId: "1172452900788-01",
  sequence: "502556",
  marketplaceOrderId: "1172452900788-01",
  marketplaceServicesEndpoint:
    "http://oms.vtexinternal.com.br/api/oms?an=luxstore",
  sellerOrderId: "00-v502556llux-01",
  origin: "Marketplace",
  affiliateId: "GHB",
  salesChannel: "1",
  merchantName: "luxstore",
  status: "handling",
  workflowIsInError: false,
  statusDescription: "Preparando Entrega",
  value: 1160,
  creationDate: "2024-02-04T20:09:43.899958+00:00",
  lastChange: "2024-02-06T20:46:11.7010747+00:00",
  orderGroup: "1415461749731",
  followUpEmail: "david@luxstore.com",
  lastMessage: "Your payment was approved",
  hostname: "luxstore",
  isCompleted: true,
  roundingError: 0,
  orderFormId: "33c887b2-bf49-4a18-8a0a-acc6b0d724bf",
  allowCancellation: true,
  allowEdition: false,
  isCheckedIn: false,
  authorizedDate: "2024-02-04T20:46:11.7010747+00:00",
  invoicedDate: "2024-02-09T10:17:40.5322681+00:00",
  cancelReason: "Item size was too large.",
  checkedInPickupPointId: "storeNameExample_901",
  totals: [
    {
      id: "Items",
      name: "Total dos Itens",
      value: 99,
    },
    {
      id: "Discounts",
      name: "Total dos Descontos",
      value: 0,
    },
    {
      id: "Shipping",
      name: "Total do Frete",
      value: 300,
    },
    {
      id: "Tax",
      name: "Total da Taxa",
      value: 0,
    },
  ],
  sellers: [
    {
      id: "1",
      name: "Lux Store",
      logo: "https://sellersLogo/images.png",
      fulfillmentEndpoint:
        "http://fulfillment.vtexcommerce.com.br/api/fulfillment?an=accountName",
    },
  ],
  clientPreferencesData: {
    locale: "en-US",
    optinNewsLetter: true,
  },
  cancellationData: {
    RequestedByUser: true,
    RequestedBySystem: false,
    RequestedBySellerNotification: false,
    RequestedByPaymentNotification: false,
    Reason: "Item size was too large.",
    CancellationDate: "2024-02-11T09:14:41.3695207Z",
  },
  taxData: {
    areTaxesDesignatedByMarketplace: true,
    taxInfoCollection: [
      {
        itemIndex: 0,
        sku: "18",
        priceTags: [
          {
            identifier: "0a9df101-330c-41ad-a4c7-5a0bd521bc9u",
            isPercentual: false,
            name: "Taxes (Magazine Luisa)",
            value: 193,
            rawValue: 1.93,
          },
        ],
      },
    ],
  },
  subscriptionData: {
    SubscriptionGroupId: "A64AC73C0FB8693A7ADB4AC69CA4FD5F",
    Subscriptions: [
      {
        ExecutionCount: 724,
        PriceAtSubscriptionDate: 100,
        ItemIndex: 0,
        Plan: {
          type: "RECURRING_PAYMENT",
          frequency: {
            periodicity: "MONTH",
            interval: 1,
          },
          validity: {
            begin: "2024-02-09T09:14:41.3695207Z",
            end: "2026-02-11T09:14:41.3695207Z",
          },
        },
      },
    ],
  },
  itemMetadata: {
    Items: [
      {
        Id: "18",
        Seller: "1",
        Name: "Cat food",
        SkuName: "Cat food",
        ProductId: "6",
        RefId: "105",
        Ean: "43673557",
        ImageUrl:
          "http://store.vteximg.com.br/ids/155392-55-55/AlconKOI.jpg?v=635918402228600000",
        DetailUrl: "/catfood/p",
        AssemblyOptions: [
          {
            Id: "vtex.subscription.plan-ana",
            Name: "vtex.subscription.plan-ana",
            Required: false,
            InputValues: {
              "vtex.subscription.key.frequency": {
                MaximumNumberOfCharacters: 8,
                Domain: ["4 month", "1 month"],
              },
            },
            Composition: {},
          },
          {
            Id: "vtex.subscription.daily",
            Name: "vtex.subscription.daily",
            Required: false,
            InputValues: {
              "vtex.subscription.key.frequency": {
                MaximumNumberOfCharacters: 5,
                Domain: ["1 day"],
              },
            },
            Composition: null,
          },
          {
            Id: "vtex.subscription.weekly",
            Name: "vtex.subscription.weekly",
            Required: false,
            InputValues: {
              "vtex.subscription.key.frequency": {
                MaximumNumberOfCharacters: 7,
                Domain: ["1 week", "2 week", "3 week", "4 week"],
              },
            },
            Composition: null,
          },
        ],
      },
    ],
  },
  marketplace: {
    baseURL: "http://oms.vtexinternal.com.br/api/oms?an=luxstore",
    isCertified: true,
    name: "luxstore",
  },
  storePreferencesData: {
    countryCode: "BRA",
    currencyCode: "BRL",
    currencyFormatInfo: {
      CurrencyDecimalDigits: 2,
      CurrencyDecimalSeparator: ",",
      CurrencyGroupSeparator: ".",
      CurrencyGroupSize: 3,
      StartsWithCurrencySymbol: true,
    },
    currencyLocale: 1046,
    currencySymbol: "R$",
    timeZone: "E. South America Standard Time",
  },
  customData: null,
  commercialConditionData: "Commercial conditions information.",
  openTextField: null,
  invoiceData: {
    userPaymentInfo: null,
    address: null,
    invoiceSubject: null,
  },
  changesAttachment: {
    id: "changeAttachment",
    changesData: [
      {
        reason: "The customer wanted to change.",
        discountValue: 3290,
        incrementValue: 0,
        itemsAdded: [],
        itemsRemoved: [
          {
            id: "1234568358",
            name: "Bay Max L",
            quantity: 1,
            price: 3290,
            unitMultiplier: null,
          },
        ],
        receipt: {
          date: "2019-02-06T20:46:04.4003606+00:00",
          orderId: "v502556llux-01",
          receipt: "029f9ab8-751a-4b1e-bf81-7dd25d14b49b",
        },
      },
    ],
  },
  callCenterOperatorData: {
    id: "CallCenterOperatorAttachment",
    email: "sandra.daves@luxstore.com",
    userName: "sandraDaves",
  },
  packageAttachment: {
    packages: [
      {
        items: [
          {
            itemIndex: 0,
            quantity: 1,
            price: 0,
            description: "001",
            unitMultiplier: 0,
          },
        ],
        courier: "PAC Correios",
        invoiceNumber: "24382",
        invoiceValue: 1015,
        invoiceUrl: "https://luxstore.com/invoices/24382.pdf",
        issuanceDate: "2024-02-09T10:10:20.5322681+00:00",
        trackingNumber: "TRK-48960684",
        invoiceKey: "CFe35201100063960001504590006629690333214542150",
        trackingUrl:
          "https://tracking.fastdelivery.com/track/146/TRK-48960684-01/24382",
        embeddedInvoice:
          "<?xml version= 1.0 encoding= utf-8 ?><Invoice>  <BusinessUnitID>204</BusinessUnitID>  <Discount>0</Discount>  <DiscountDueDate></DiscountDueDate>  <DocumentType>INVOICE</DocumentType>  <DueDate>15/2/2024 12:00:00 AM</DueDate>  <Freight>90</Freight></invoice>",
        type: "Input",
        courierStatus: {
          status: "ok",
          finished: true,
          deliveredDate: "2024-02-15T10:17:40.5322681+00:00",
          data: [
            {
              lastChange: "2024-02-15T10:17:40.5322681+00:00",
              city: "Rio de Janeiro",
              state: "RJ",
              description: "Carrier received the package",
              createDate: "2024-02-13T10:12:55.5322681+00:00",
            },
          ],
        },
        cfop: "5100",
        restitutions: {
          Refund: {
            value: 1015,
            giftCardData: null,
            items: [
              {
                useFreight: false,
                isCompensation: false,
                compensationValue: 0,
                id: "7060874",
                quantity: 1,
                price: 0,
                description: "The size was too big.",
              },
            ],
          },
        },
        volumes: 1,
        EnableInferItems: false,
      },
    ],
  },
  paymentData: {
    transactions: [
      {
        isActive: true,
        transactionId: "E4CFCEA1A2BF42AE9A3FAE8ED460CBFE",
        merchantName: "luxstore",
        payments: [
          {
            id: "A536832D9B95439DB73A11558B6F2C2C",
            paymentSystem: "2",
            paymentSystemName: "Visa",
            value: 3990,
            installments: 1,
            referenceValue: 3990,
            cardHolder: null,
            cardNumber: null,
            firstDigits: "444433",
            lastDigits: "1111",
            cvv2: "351",
            expireMonth: "12",
            expireYear: "2029",
            url: null,
            giftCardId: null,
            giftCardName: null,
            giftCardCaption: null,
            redemptionCode: null,
            group: "creditCard",
            tid: "65738757",
            dueDate: "12/29",
            connectorResponses: {
              authId: "738757",
              Tid: "65738757",
              ReturnCode: "200",
              Message: "857956",
            },
            giftCardProvider: "presentCard",
            giftCardAsDiscount: false,
            koinUrl: "koinURL",
            accountId: "5BC5C6B417FE432AB971B1D399F190C9",
            parentAccountId: "5BC5C6B417FE432AB971B1D399F190C9",
            bankIssuedInvoiceIdentificationNumber:
              "23797770100000019003099260100022107500729050",
            bankIssuedInvoiceIdentificationNumberFormatted:
              "32534.95739 75945.24534 54395.734214 5",
            bankIssuedInvoiceBarCodeNumber:
              "325349573975945245345439573421443986734065",
            bankIssuedInvoiceBarCodeType: "i25",
            billingAddress: {
              country: "BRA",
              street: "Brigadeiro Faria Lima Avenue",
              number: "4440",
              complement: "10th Floor",
              neighborhood: "Itaim Bibi",
              postalCode: "04538132",
              city: "São Paulo",
              state: "SP",
            },
          },
        ],
      },
    ],
    giftCards: [],
  },
  shippingData: {
    id: "shippingData",
    address: {
      addressType: "residential",
      receiverName: "Rodrigo Smith",
      addressId: "3206601248910",
      versionId: "e9c3bec2-125d-4b96-a021-316c3aa9f14f",
      entityId: "eabfb564-99d6-40d8-bd6c-bddbd4990aad",
      postalCode: "22630-011",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "BRA",
      street: "Avenida Lúcio Costa",
      number: "126",
      neighborhood: "Barra da Tijuca",
      complement: "10",
      reference: "apartment",
      geoCoordinates: [-43.3373718, -23.0105873],
    },
    logisticsInfo: [
      {
        itemIndex: 0,
        selectedSla: "Normal",
        lockTTL: "10d",
        price: 3000,
        listPrice: 3000,
        sellingPrice: 3000,
        deliveryWindow: null,
        deliveryCompany: "All CEPs",
        shippingEstimate: "4bd",
        shippingEstimateDate: "2024-03-09T10:13:40.1020453+00:00",
        slas: [
          {
            id: "Normal",
            name: "Normal",
            shippingEstimate: "4bd",
            deliveryWindow: null,
            price: 3000,
            deliveryChannel: "delivery",
            pickupStoreInfo: {
              additionalInfo: null,
              address: null,
              dockId: null,
              friendlyName: null,
              isPickupStore: false,
            },
            polygonName: "region196",
            lockTTL: "10d",
            pickupPointId: "1_store-RJ",
            transitTime: "3d",
            pickupDistance: 0,
          },
          {
            id: "Express",
            name: "Express",
            shippingEstimate: "2bd",
            deliveryWindow: null,
            price: 3000,
            deliveryChannel: "pickup-in-point",
            pickupStoreInfo: {
              additionalInfo: "Arrive soon",
              address: {
                addressType: "pickup",
                receiverName: null,
                addressId: "VTEX-RJ",
                versionId: null,
                entityId: null,
                postalCode: "22250-040",
                city: "Rio de Janeiro",
                state: "RJ",
                country: "BRA",
                street: "Praia de Botafogo",
                number: "300",
                neighborhood: "Botafogo",
                complement: "4th floor",
                reference: null,
                geoCoordinates: [-43.18259, -22.94436],
              },
              dockId: "Take away dock",
              friendlyName: "Store Name RJ",
              isPickupStore: true,
            },
            polygonName: "",
            lockTTL: "10d",
            pickupPointId: "1_VTEX-RJ",
            transitTime: "0d",
            pickupDistance: 17.473064422607422,
          },
        ],
        shipsTo: ["BRA"],
        deliveryIds: [
          {
            courierId: "136769c",
            courierName: "Correios",
            dockId: "dock_1f95",
            quantity: 1,
            warehouseId: "warehouse_68d7",
            accountCarrierName: "recorrencia",
            kitItemDetails: [],
          },
        ],
        deliveryChannels: [
          {
            id: "delivery",
            stockBalance: 0,
          },
          {
            id: "pickup-in-point",
            stockBalance: 0,
          },
        ],
        deliveryChannel: "delivery",
        pickupStoreInfo: {
          additionalInfo: null,
          address: null,
          dockId: null,
          friendlyName: null,
          isPickupStore: false,
        },
        addressId: "3206601248910",
        versionId: null,
        entityId: null,
        polygonName: "",
        pickupPointId: null,
        transitTime: "3d",
      },
    ],
    trackingHints: [
      {
        trackingId: "701-1947797-1739404_DBA",
        courierName: "Amazon Label",
        trackingUrl:
          "https://storeName.vtexcommercestable.com.br/api/integration-amazon/logistic-program/dba/labels?orderId=d9xsHobRJCIWbbub0",
        trackingLabel: "Amazon Label",
      },
    ],
    selectedAddresses: [
      {
        addressType: "residential",
        receiverName: "Rodrigo Smith",
        addressId: "3206601248910",
        versionId: "e9c3bec2-125d-4b96-a021-316c3aa9f14f",
        entityId: "eabfb564-99d6-40d8-bd6c-bddbd4990aad",
        postalCode: "22630-011",
        city: "Rio de Janeiro",
        state: "RJ",
        country: "BRA",
        street: "Avenida Lúcio Costa",
        number: "126",
        neighborhood: "Barra da Tijuca",
        complement: "10",
        reference: "4th floor",
        geoCoordinates: [-43.3373718, -23.0105873],
      },
    ],
    contactInformation: [
      {
        id: "0",
        email: "contact@email.com",
        firstName: "U**",
        lastName: "H*****",
        phone: "556196842267",
        document: "845.134.270-19",
        documentType: "cpf",
        entityId: "5e50b939-2797-4644-afc9-202069cec129",
        versionId: "9af7b09a-be4c-41a1-b0e9-47c54dd062b4",
      },
    ],
  },
  ratesAndBenefitsData: {
    id: "ratesAndBenefitsData",
    rateAndBenefitsIdentifiers: [
      {
        id: "2a7acc17-1eb9-4541-8ac6-2776ce9628e6",
        name: "Shipping promo $100",
        featured: true,
        description: "Promotion of the week",
        matchedParameters: {
          "Free Shipping": "100",
        },
        additionalInfo: null,
      },
    ],
  },
  marketingData: {
    id: "marketingData",
    utmSource: "fb",
    utmPartner: "utm partner name",
    utmMedium: "utm medium name",
    utmCampaign: "christmas",
    coupon: "sale",
    utmiCampaign: " ",
    utmipage: " ",
    utmiPart: " ",
    marketingTags: ["vtex-subscription"],
  },
  giftRegistryData: {
    giftRegistryId: "154",
    giftRegistryType: "9",
    giftRegistryTypeName: "Wedding list",
    addressId: "4352357942349",
    description: "Alanna & Daniel",
  },
  clientProfileData: {
    id: "clientProfile_6930",
    email: "rodrigo.smith@email.com",
    firstName: "Rodrigo",
    lastName: "Smith",
    documentType: "cpf",
    document: "845.134.270-19",
    phone: "+5561992227222",
    corporateName: null,
    tradeName: null,
    corporateDocument: null,
    stateInscription: null,
    corporatePhone: null,
    isCorporate: false,
    userProfileId: "5660c55f-714d-4b14-88a7-b03e9bfbdd2y",
    userProfileVersion: "b98d1d7b-4075-4d88-81e5-418d36b078g3",
    customerClass: null,
    customerCode: "933d29f5-c7c5-4d12-b0c8-c30079c33b21",
  },
  items: [
    {
      uniqueId: "94913BB553334977BFD669A24E678C69",
      id: "18",
      productId: "6",
      ean: "3256873",
      lockId: "00-1415461749731-01",
      itemAttachment: {
        content: {},
        name: null,
      },
      attachments: [],
      quantity: 1,
      seller: "1",
      name: "Bay Max L",
      refId: "BIGBML",
      price: 990,
      listPrice: 1990,
      manualPrice: null,
      priceTags: [],
      imageUrl:
        "https://luxstore.img.com.br/ids/155392-55-55/KOI.jpg?v=6359184022286",
      detailUrl: "/bay-max-9429485/p",
      components: [],
      bundleItems: [
        {
          id: 12,
          quantity: 2,
        },
      ],
      params: [],
      offerings: [],
      attachmentOfferings: [
        {
          name: "luxstore.subscription.weekly",
          required: false,
          schema: {
            "luxstore.subscription.key.frequency": {
              MaximumNumberOfCharacters: 7,
              Domain: ["1 week", "2 week", "3 week", "4 week"],
            },
          },
        },
      ],
      sellerSku: "18",
      priceValidUntil: "2025-03-05T10:13:09.0000000+00:00",
      commission: 0,
      tax: 0,
      preSaleDate: null,
      additionalInfo: {
        brandName: "Lux Brand",
        brandId: "2000000",
        categoriesIds: "/9/",
        categories: [
          {
            id: 9,
            name: "Coach",
          },
        ],
        productClusterId: "135",
        commercialConditionId: "1",
        dimension: {
          cubicweight: 1,
          height: 10,
          length: 10,
          weight: 10,
          width: 10,
        },
        offeringInfo: null,
        offeringType: null,
        offeringTypeId: null,
      },
      measurementUnit: "un",
      unitMultiplier: 1,
      sellingPrice: 990,
      isGift: false,
      shippingPrice: null,
      rewardValue: 1599,
      freightCommission: 0,
      priceDefinition: {
        sellingPrices: [
          {
            value: 990,
            quantity: 1,
          },
        ],
        calculatedSellingPrice: 990,
        total: 990,
        reason: null,
      },
      taxCode: "product_Free",
      parentItemIndex: 0,
      parentAssemblyBinding: "assembly_product_warranty",
      callCenterOperator: null,
      serialNumbers: null,
      assemblies: [],
      costPrice: 520,
    },
  ],
  marketplaceItems: [],
};
