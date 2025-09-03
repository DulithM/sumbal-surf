import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Download, RefreshCw, Star, Clock } from "lucide-react"

const transactions = [
  {
    id: "ORD-2024-0156",
    date: "2024-03-15",
    time: "12:30 PM",
    items: ["Surf & Turf Bowl", "Coconut Water"],
    originalAmount: 27.98,
    discountAmount: 4.2,
    finalAmount: 23.78,
    status: "Completed",
    rating: 5,
  },
  {
    id: "ORD-2024-0142",
    date: "2024-03-12",
    time: "1:15 PM",
    items: ["Coastal Fish Tacos (2)", "Mango Smoothie"],
    originalAmount: 22.97,
    discountAmount: 3.45,
    finalAmount: 19.52,
    status: "Completed",
    rating: 4,
  },
  {
    id: "ORD-2024-0128",
    date: "2024-03-08",
    time: "12:45 PM",
    items: ["Ocean Breeze Salad", "Iced Tea"],
    originalAmount: 19.98,
    discountAmount: 4.99,
    finalAmount: 14.99,
    status: "Completed",
    rating: 5,
  },
  {
    id: "ORD-2024-0115",
    date: "2024-03-05",
    time: "6:30 PM",
    items: ["Grilled Mahi Sandwich", "Sweet Potato Fries", "Craft Beer"],
    originalAmount: 31.97,
    discountAmount: 4.8,
    finalAmount: 27.17,
    status: "Completed",
    rating: 4,
  },
  {
    id: "ORD-2024-0098",
    date: "2024-03-01",
    time: "12:00 PM",
    items: ["Poke Paradise Bowl", "Kombucha"],
    originalAmount: 25.98,
    discountAmount: 6.5,
    finalAmount: 19.48,
    status: "Completed",
    rating: 5,
  },
]

export function TransactionHistory() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Order History</h2>
          <p className="text-muted-foreground">Your recent dining experiences and savings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Orders This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">$89.20</p>
              <p className="text-sm text-muted-foreground">Total Saved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">$372.50</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <History className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{transaction.id}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {transaction.date} at {transaction.time}
                      </div>
                    </div>
                    <Badge
                      variant={transaction.status === "Completed" ? "secondary" : "outline"}
                      className="ml-auto lg:ml-0"
                    >
                      {transaction.status}
                    </Badge>
                  </div>

                  <div className="ml-13">
                    <p className="text-sm text-muted-foreground mb-2">{transaction.items.join(", ")}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Original: </span>
                        <span className="line-through">${transaction.originalAmount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Saved: </span>
                        <span className="text-secondary font-medium">-${transaction.discountAmount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Paid: </span>
                        <span className="font-semibold">${transaction.finalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < transaction.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Orders</Button>
      </div>
    </div>
  )
}
