import { Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import FundWalletDialog from "@/components/wallet/fund-wallet-dialog"
import type { FundWalletValues } from "@/lib/validations/wallet"

type WalletBalanceCardProps = {
  balance: string
  onFund: (values: FundWalletValues) => void
}

export default function WalletBalanceCard({ balance, onFund }: WalletBalanceCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-wallet/10">
            <Wallet className="h-6 w-6 text-wallet" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Available balance</p>
            <p className="text-3xl font-medium tabular-nums">{balance}</p>
          </div>
        </div>

        <FundWalletDialog onFund={onFund} />
      </CardContent>
    </Card>
  )
}