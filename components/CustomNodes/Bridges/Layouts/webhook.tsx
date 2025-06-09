export const WebhookLayout = () => {
    return (<>
    {/* {isEcommerceSource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full p-2 pb-0 pt-0 transition-all duration-300"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <EventsConfig
                platform={platform as PlatformType}
                selectedEvents={selectedEvents}
                onEventsChange={setSelectedEvents}
                webhookId={getWebhookUrl?._id}
                webhook={getWebhookUrl}
                source={edgeSource?.sourceHandle!}
                nodeId={id}
              />
            </motion.div>
          </motion.div>
        )}
        {!isEcommerceSource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-6 flex w-full h-full items-center justify-center "
          >
            <p className="text-[11px] text-gray-500 text-center">
              Connect to an e-commerce node to configure platform and events
            </p>
          </motion.div>
        )}
        <Separator className="my-2 mb-0" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="p-2 w-full pt-0"
        >
          {getWebhookUrl?.url ? (
            <motion.div 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}>
            <ScriptCopyBtn
              codeLanguage="http"
              showMultiplePackageOptions={false}
              className="w-full "
              lightTheme="nord"
              darkTheme="vitesse-dark"
              commandMap={{
                curl: `${getWebhookUrl?.url}`,
              }}
            />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center py-2 gap-2">
              <p className="text-[11px] text-gray-500 text-center">Waiting for Source</p> <Spinner size="sm" />
            </div>
          )}
        </motion.div> */}
    </>);
};